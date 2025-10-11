import {useState} from 'react';
import Navbar from '@/components/Navbar';
import { HomeIcon,Folder,User,Wallet,ChartColumnBig,FileText,MessageSquare,Settings,Menu} from 'lucide-react';
import DashboardContentPage from '@/pages/DashboardContentPage';

export default function LandingPage() {
    const [menuOpen,setMenuOpen] = useState(false);
    return (
        <div className='min-h-screen bg-gray-100 '>
            <Navbar />
            <div className='grid md:grid-cols-12 gap-6 max-w-full'>
            {/*md+ screens */}
            <aside className='hidden  md:block md:col-span-2 lg:col-span-2 '>
                <div className='sticky top-16 bg-[#193245] h-[calc(100vh-4rem)] flex flex-col justify-center space-y-2 rounded-b-md px-2'> 
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition cursor-pointer'>
                        <HomeIcon size={20} />
                        <span className="text-sm font-medium ">Dashboard</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition cursor-pointer'>
                        <User size={20} />
                        <span className="text-sm font-medium">Users</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition cursor-pointer'>
                        <Folder size={20} />
                        <span className="text-sm font-medium">Projects</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition cursor-pointer'>
                        <Wallet size={20} />
                        <span className="text-sm font-medium">Finance</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition cursor-pointer '>
                        <ChartColumnBig size={20} />
                        <span className="text-sm font-medium">Reports</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition cursor-pointer'>
                        <FileText size={20} />
                        <span className="text-sm font-medium">Documents</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition cursor-pointer'>
                        <MessageSquare size={20} />
                        <span className="text-sm font-medium">Communication</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition cursor-pointer'>
                        <Settings size={20} />
                        <span className="text-sm font-medium">Settings</span>
                    </button>

                </div>
            </aside> 
            {/* Humburger for mobile screens */}
                <div className='md:hidden fixed top-4 left-4 z-50'>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <Menu className="h-8 w-8 text-slate-800 "/>
                    </button>
                </div>
            {/*Mobile sidebar*/}
            {menuOpen && (
                <div className='fixed top-18 left-0 w-64 h-full z-40 p-4 space-y-2 bg-slate-800 ml-2'>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition'>
                        <HomeIcon size={20} />
                        <span className="text-sm font-medium">Dashboard</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition'>
                        <User size={20} />
                        <span className="text-sm font-medium">Users</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition'>
                        <Folder size={20} />
                        <span className="text-sm font-medium">Projects</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition'>
                        <Wallet size={20} />
                        <span className="text-sm font-medium">Finance</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition'>
                        <ChartColumnBig size={20} />
                        <span className="text-sm font-medium">Reports</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition'>
                        <FileText size={20} />
                        <span className="text-sm font-medium">Documents</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition'>
                        <MessageSquare size={20} />
                        <span className="text-sm font-medium">Communication</span>
                    </button>
                    <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white transition'>
                        <Settings size={20} />
                        <span className="text-sm font-medium">Settings</span>
                    </button>
                </div>
            )}
            {/*main*/}
                <main className='col-span-12 lg:col-span-10'>
                     <DashboardContentPage/>
                </main>
            </div>
        </div>
    )
}