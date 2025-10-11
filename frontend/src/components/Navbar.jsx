import { CircleUserRound,Bell,LogOut,LaptopMinimal } from "lucide-react"
export default function Navbar() {
    return (
    <div className="bg-[#285799] w-full h-16 text-white rounded-t-md align-center sticky top-0">
        <div className="flex items-center justify-between  px-6 h-full ">
            {/*Left section*/}
            <div className="flex items-center ">
                <h1 className="font-semibold">Jawaab Management System</h1>
            </div>
            {/*Right section */}
                <nav className="flex items-center gap-6">
                    <div>
                         <Bell className="h-5 w-5 text-white hover:text-gray-300  cursor-pointer" />
                    </div>
                    <div className="h-8 w-8 object-cover flex justify-center items-center bg-gray-200 rounded-full cursor-pointer">
                        <LaptopMinimal className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="h-8 w-8 object-cover flex justify-center items-center bg-gray-200 rounded-full cursor-pointer">
                        <CircleUserRound className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                        <LogOut className="h-5 w-5  text-white hover:text-gray-300 cursor-pointer" />
                    </div>
                </nav>
        </div>

    </div>
    );
}