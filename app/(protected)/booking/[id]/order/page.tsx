"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter, useParams } from "next/navigation"
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useActionBooking } from "@/hooks/useActionBooking"
import { IBooking } from "@/types/booking"
import { usePayment } from "@/hooks/usePayment"

enum Status {
  Loading,
  Success,
  Failed,
  Cancelled,
  Error,
}

export default function BookingResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ id: string }>()
  const orderCode = searchParams.get("orderCode")
  const isCancelled = searchParams.get("cancelled")

  const [status, setStatus] = useState<Status>(Status.Loading)
  const [bookingId, setBookingId] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const { createBookingMovie, bookingLoading, bookingError } = useActionBooking()
  const { verifyPaymentOrder, paymentLoading, paymentError } = usePayment()


  useEffect(() => {
    if (!orderCode) {
      setStatus(Status.Error)
      setErrorMessage("Không tìm thấy mã đơn hàng.")
      return
    }

    if (isCancelled) {
      setStatus(Status.Cancelled)
      // Clear session storage if user cancels
      sessionStorage.removeItem(orderCode)
      return
    }

    const verifyPaymentAndCreateBooking = async () => {
      try {
        // Step 1: Verify payment with your backend
        const verifyResponse = await verifyPaymentOrder(parseInt(orderCode!))
        
        if (!verifyResponse?.ok) {
          throw new Error("Xác thực thanh toán thất bại.")
        }
        
        // Step 2: Check payment status
        if (verifyResponse?.status === 'PAID') {
          // Step 3: Retrieve booking data from sessionStorage
          const storedBooking = sessionStorage.getItem(orderCode)
          if (!storedBooking) {
            throw new Error("Không tìm thấy thông tin đặt vé. Giao dịch đã được thanh toán, vui lòng liên hệ hỗ trợ.")
          }
          
          const bookingData: IBooking = JSON.parse(storedBooking)
          
          // Step 4: Create booking in your system
          const bookingResult = await createBookingMovie(bookingData)
          
          if (bookingError || !bookingResult) {
            throw new Error("Thanh toán thành công nhưng tạo vé thất bại. Vui lòng liên hệ hỗ trợ.")
          }
          
          // Clear storage on success
          sessionStorage.removeItem(orderCode)
          setBookingId(bookingResult.booking_id)
          setStatus(Status.Success)
          // Redirect to a success page or show success state
          router.push(`/booking/${params.id}/confirmation?booking_id=${bookingResult.booking_id}`);
          
        } else { // PENDING, CANCELLED, EXPIRED, etc.
          // For other statuses, we might want to keep the session data
          // in case the user wants to try again, but for this flow, let's clear it.
          sessionStorage.removeItem(orderCode)
          setStatus(Status.Failed)
          setErrorMessage(`Thanh toán không thành công. Trạng thái: ${verifyResponse?.status}`)
        }
      } catch (error: any) {
        // Also clear storage on error
        if (orderCode) {
          sessionStorage.removeItem(orderCode)
        }
        setStatus(Status.Error)
        setErrorMessage(error.message || "Đã có lỗi xảy ra trong quá trình xử lý.")
      }
    };

    verifyPaymentAndCreateBooking();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderCode, isCancelled, params.id])

  const renderStatus = () => {
    switch (status) {
      case Status.Loading:
        return (
          <div className="flex flex-col items-center text-center">
            <Loader2 className="w-16 h-16 animate-spin text-primary mb-4" />
            <p className="text-xl font-semibold">Đang xử lý thanh toán...</p>
            <p className="text-muted-foreground">Vui lòng không rời khỏi trang này.</p>
          </div>
        )
      case Status.Success:
        return (
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-xl font-semibold">Thanh toán thành công!</p>
            <p className="text-muted-foreground">
              Đơn đặt vé của bạn đã được xác nhận. Mã đặt vé của bạn là #{bookingId}.
            </p>
            <Button asChild className="mt-6">
              <Link href={`/account?tab=history`}>Xem Lịch sử đặt vé</Link>
            </Button>
          </div>
        )
      case Status.Failed:
        return (
          <div className="flex flex-col items-center text-center">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-xl font-semibold">Thanh toán thất bại</p>
            <p className="text-muted-foreground">{errorMessage}</p>
            <Button asChild className="mt-6">
              <Link href="/">Trở về trang chủ</Link>
            </Button>
          </div>
        )
      case Status.Cancelled:
        return (
          <div className="flex flex-col items-center text-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
            <p className="text-xl font-semibold">Giao dịch đã được hủy</p>
            <p className="text-muted-foreground">Bạn đã hủy giao dịch thanh toán.</p>
            <Button asChild className="mt-6">
              <Link href="/">Trở về trang chủ</Link>
            </Button>
          </div>
        )
      case Status.Error:
        return (
          <div className="flex flex-col items-center text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-xl font-semibold">Đã có lỗi xảy ra</p>
            <p className="text-muted-foreground">{errorMessage}</p>
            <Button asChild className="mt-6">
              <Link href="/">Trở về trang chủ</Link>
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[60vh] py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Kết quả giao dịch</CardTitle>
        </CardHeader>
        <CardContent>
          {renderStatus()}
        </CardContent>
      </Card>
    </div>
  )
}