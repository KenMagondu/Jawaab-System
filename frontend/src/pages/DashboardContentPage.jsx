import {Card,CardHeader,CardContent} from "@/components/ui/card";
import { ChevronRight,ChevronLeft,Pin,FileText } from "lucide-react";
import { useState } from "react";
export default function DashboardContentPage() {

    const today = new Date();
    const [currentDate,setCurrentDate] = useState(today);

    const year = currentDate.getFullYear();
    const month =currentDate.getMonth();
    //Days in month
    const daysInMonth = new Date(year,month + 1,0).getDate();
    //First day of month(0=sunday,1=Mon)
    const firstDay = new Date(year,month,1).getDay();
    //Array of days
    const days = Array.from({length:daysInMonth}, (_,i) => i + 1);
    //Navigation
    const prevMonth = () => setCurrentDate(new Date(year,month - 1,1));
    const nextMonth = () => setCurrentDate(new Date(year,month + 1,1));
    
    //Example data for chart
     const data = [
    { month: "Jan", value: 40, color: "bg-blue-500" },
    { month: "Feb", value: 60, color: "bg-blue-500" },
    { month: "Mar", value: 90, color: "bg-green-700" },
    { month: "Apr", value: 70, color: "bg-green-700" },
  ];

    return (
        <div className="grid md:col-span-10 ">
            {/*cards*/}
            <div className="flex  flex-wrap m-2 p-2 gap-6">
                {/*Projects Card*/}
                <Card className="bg-white rounded-none shadow-sm flex-1 basis-[20%] flex flex-col justify-center px-6">
                    <div className="text-start">
                        <h1 className="text-gray-800 text-lg font-semibold">Projects</h1>
                        <p className="text-3xl font-bold text-gray-900 mt-2">14</p>
                    </div>
                </Card>
                {/*staff card*/}
                <Card className="bg-white rounded-none shadow-sm flex-1 basis-[20%] flex flex-col justify-center px-6">
                    <div className="text-start">
                        <h1 className="text-gray-800 text-lg font-semibold">Staff</h1>
                        <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
                    </div>
                </Card>
                {/*Donors card */}
                <Card className="bg-white rounded-none shadow-sm  flex-[2] basis-[50%] flex flex-col justify-center  px-6 ">
                    <div className="flex justify-between gap-x-6 ">
                        <div className="text-start">
                            <h1 className="text-gray-800 text-lg font-semibold">Donors</h1>
                            <p className="text-3xl font-bold text-gray-900 mt-2">36</p>
                        </div>
                        <div>
                            <h1 className="text-gray-800 text-lg font-semibold">Income/Expenses</h1>
                            <p className="text-xl font-bold text-gray-900 mt-3">$22500,$18000</p>
                        </div>
                    </div>
                </Card>
                {/*Calendar*/}
                <Card  className="bg-white rounded-none shadow-sm p-4 flex flex-col w-full md:basis-[40%] ">
                    <div className="text-start">
                        <h1 className="text-gray-800 text-lg font-semibold">Calendar</h1>
                        
                    </div>
                    {/*Header*/}
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={prevMonth} className="px-2 py-1 "><ChevronLeft/></button>
                        <h2 className="text-sm font-semibold">
                            {currentDate.toLocaleString("default",{month:"long"})} {year}
                        </h2>
                        <button onClick={nextMonth} className="px-2 py-1"><ChevronRight /></button>
                    </div>
                    {/*Weekday labels*/}
                    <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2">
                        {["SU","M","T","W","T","F","S"].map((d,i) => (
                            <div key={i}>{d}</div>
                        ))}
                    </div>
                    {/*Dates*/}
                    <div className="grid grid-cols-7 text-center gap-y-2">
                        {/*Empty slots before first day */}
                        {Array.from({length:firstDay}).map((_,i) => (
                            <div key={`empty-${i}`}/>
                        ))}

                    
                    {/*Days*/}
                    {days.map(day => {
                        const isToday = 
                        day === today.getDate() &&
                        month === today.getMonth() && 
                        year === today.getFullYear();
                    return (
                        <div
                            key={day}
                            className={`p-2 rounded-md ${
                                isToday ? "bg-blue-600 text-white font-bold" :"hover:bg-gray-100"
                            }`}
                        >
                            {day}
                        </div>
                    )
                    })}
                    </div>
                </Card>
                {/*Recent projecs */}
                <Card className="bg-white rounded-none shadow-sm flex flex-col w-full md:basis-[57.5%]  md:h-90 px-6">
                    <div className="text-start">
                        <h1 className="text-gray-800 text-lg font-semibold">Recent Projects</h1>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 ">
                      {/*Todo card*/}
                      <div className="flex-1 rounded-md shadow-md bg-white border border-gray-200 ">
                        <div className=" rounded-t-md bg-gray-100 w-full py-3 px-4 font-semibold text-gray-700 ">To-Do</div>
                        <div className="p-4 space-y-3">
                        <div className="rounded-md border border-gray-300 shadow-sm p-3 bg-white">
                            <h1 className="font-bold ">Design new logo</h1>
                            <p className="text-md text-gray-400 ">+418</p>
                        </div>
                        <div className="rounded-md border border-gray-300 shadow-sm p-3 bg-white ">
                            <h1 className="font-bold text-gray-800">Update website</h1>
                        </div>
                        </div>
                      </div>
                    {/*In progress*/}
                      <div className="flex-1 rounded-md shadow-md bg-white border border-gray-200 ">
                        <div className=" rounded-t-md bg-gray-100 w-full py-3 px-4 font-semibold text-gray-700 ">In Progress</div>
                        <div className="p-4 space-y-3">
                        <div className="rounded-md border border-gray-300 shadow-sm p-6 bg-white">
                            <h1 className="font-bold ">Develop mobile app</h1>
                        </div>
                        <div className="rounded-md border border-gray-300 shadow-sm p-3 bg-white ">
                            <h1 className="font-bold text-gray-800">Prepare budget</h1>
                        </div>
                        </div>
                      </div>
                    {/*Done card*/}
                    <div className="flex-1 rounded-md shadow-md bg-white border border-gray-200 ">
                        <div className=" rounded-t-md bg-gray-100 w-full py-3 px-4 font-semibold text-gray-700 ">Done</div>
                        <div className="p-4 space-y-3">
                        <div className="rounded-md border border-gray-300 shadow-sm p-3 bg-white">
                            <h1 className="font-bold ">Launch marketing campaign</h1>
                        </div>
                        <div className="rounded-md border border-gray-300 shadow-sm p-3 bg-white ">
                            <h1 className="font-bold text-gray-800">Prepare budget</h1>
                        </div>
                        </div>
                      </div>
                    </div>
                </Card>
                {/*Finance card*/}
                <Card className="bg-white rounded-none shadow-md flex flex-col p-4 w-full md:basis-[40%]">
                    <div className=" text-start border-b border-gray-400 pb-2 mb-4 ">
                            <h1 className="text-lg text-gray-800 font-semibold">Finance</h1>
                    </div>
                    <div className="flex items-center gap-20 ">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            <span className="text-sm font-medium text-gray-700">Income</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-700"></span>
                            <span className="text-sm font-medium text-gray-700">Expenses</span>
                        </div>
                    </div>
                    <hr className="border-gray-200 mb-2"/>
                    
                      <div className="flex justify-between items-start mb-3">
                    <div>
                    <h2 className="text-sm font-semibold text-gray-800">All Hands Meeting</h2>
                    <p className="text-xs text-gray-500">10:00 AM - 11:00 AM</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">$500</p>
                </div>
                </Card>
                {/*Finance*/}
                <Card className="bg-white rounded-none shadow-md flex flex-col  p-4 w-full md:basis-[30%]">
                    <h1 className="text-lg font-semibold text-gray-800 mb-4">Finance</h1>
                    {/*Chart*/}
                    {/* Chart container: definite height */}
                    <div className="relative">
                    <div className="flex items-end justify-between h-40 gap-4 mb-2">
                        {data.map((item) => (
                        <div key={item.month} className="flex flex-col items-center flex-1 h-full justify-end">
                            <div
                            className={`${item.color} w-8  transition-all`}
                            style={{ height: `${item.value}%`, minHeight: 6 }}
                            />
                            <span className="text-sm text-gray-600 mt-2">{item.month}</span>
                        </div>
                        ))}
                    </div>
                    <div className="absolute left-0 right-0 bottom-8 border-t border-gray-400 pointer-events-none" />
                    </div>

                    {/* Divider */}
                    
                    <h2 className="text-sm font-semibold text-gray-700 mb-2">
                        Recent Donations
                    </h2>
                </Card>
                {/*Quick access*/}
                <Card className="bg-white rounded-none shadow-md w-full md:basis-[25%] flex flex-col p-4 md:h-50">
                    <div className="text-start border-b border-gray-300 pb-2 " >
                        <h1 className="text-lg font-semibold text-gray-800 ">Quick Access</h1>
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex items-center gap-2 border-b border-gray-300 pb-2 mb-3">
                            <span><Pin/></span>
                            <h1 className="text-lg font-semibold text-gray-800">Add New Project</h1>
                        </div>
                        <div className="flex items-center gap-2 pb-2 mb-3">
                            <span><FileText/></span>
                            <h1 className="text-lg font-semibold text-gray-800">Generate Report</h1>
                        </div>

                    </div>

                </Card>
            </div>

        </div>
    )
}