"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("title")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?type=${searchType}&q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <Tabs defaultValue="title" onValueChange={setSearchType}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="title">Title</TabsTrigger>
          <TabsTrigger value="genre">Genre</TabsTrigger>
          <TabsTrigger value="actor">Actor</TabsTrigger>
          <TabsTrigger value="keyword">Keyword</TabsTrigger>
        </TabsList>
        <form onSubmit={handleSearch}>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Search by ${searchType}...`}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
}
