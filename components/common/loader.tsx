const Loader = () => {
    return (
        <div className="flex justify-center items-center gap-4">
            <div
                className="
                w-[17px] h-[17px]
                rounded-full
                border-[3px]
                border-t-white
                border-r-transparent
                border-b-transparent
                border-l-transparent
                box-border
                animate-spin
                "
            />
            <div>Please wait ...</div>
        </div>
    );
}
 
export default Loader;