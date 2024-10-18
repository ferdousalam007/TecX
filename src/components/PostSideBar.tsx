"use client"
// import Image from 'next/image';
import React from 'react'

const PostSideBar = () => {
     const [activeTab, setActiveTab] = React.useState("trending");
   return (
     <div className="max-w-sm mx-auto p-4 bg-black rounded-lg sticky top-0 pt-[100px]">
       <div className="flex space-x-2 mb-4">
         <div
           className={`px-4 py-2 rounded cursor-pointer ${
             activeTab === "trending" ? "bg-purple-500" : "bg-gray-800"
           } text-white`}
           onClick={() => setActiveTab("trending")}
         >
           TRENDING
         </div>
         <div
           className={`px-4 py-2 rounded cursor-pointer ${
             activeTab === "latest" ? "bg-purple-500" : "bg-gray-800"
           } text-white`}
           onClick={() => setActiveTab("latest")}
         >
           LATEST
         </div>
       </div>
       <div className="space-y-4">
         {activeTab === "trending" && (
           <>
             <div className="flex space-x-4 items-center">
               {/* <Image
                 src={}
                 alt={}
                 height={500}
                 width={500}
                 className="w-12 h-12 rounded-full"
               /> */}
               <div>
                 <p className="text-gray-400 text-xs">BUSINESS</p>
                 <p className="text-white font-semibold">
                   Navigation System as anything Doesn Space?
                 </p>
               </div>
             </div>
             
            
           </>
         )}
         {activeTab === "latest" && (
           <>
             <div className="flex space-x-4 items-center">
               {/* <Image
                 src={}
                 alt={}
                 height={500}
                 width={500}
                 className="w-12 h-12 rounded-full"
               /> */}
               <div>
                 <p className="text-gray-400 text-xs">BUSINESS</p>
                 <p className="text-white font-semibold">
                   How Product Designers Can Gamification for any Good.
                 </p>
               </div>
             </div>
           </>
         )}
       </div>
     </div>
   );
}

export default PostSideBar