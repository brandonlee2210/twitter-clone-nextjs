"use client";

import Avatar from "../Avatar";

const FollowBar = () => {
  return (
    <div className="col-span-1 px-6 py-4 hidden lg:block ">
      <div className="bg-slate-200 rounded-xl p-4">
        <h2 className="text-black text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex flex-row gap-4 ">
            <Avatar userId="test" />
            <div className="flex flex-col">
              <p className="text-black font-semibold text-sm">Test Name</p>
              <p className="text-neutral-400 text-sm">@Test username</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FollowBar;
