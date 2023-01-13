import { Outlet } from "react-router-dom";

export default function userManagement() {
  return (
    <>
      <div>
        <div>users</div>
        <div>
          <div>
            <label htmlFor="">search</label>
            <input type="text" name="" id="" placeholder="search" />
          </div>
          <div>
            <label htmlFor="">institution</label>
            <select name="" id="">
              <option value="">data come form api multi select</option>
            </select>
          </div>
          <div>
            <label htmlFor="">role</label>
            <select name="" id="">
              <option value="">data come from apis multi select</option>
            </select>
          </div>
        </div>
        <div>
          <div>
            <button>search</button>
            <button>reset</button>
          </div>
          <div>
            <button>create user</button>
          </div>
        </div>
        <div>
          <div>
            <div>query</div>
            <div>check box drop down of columns</div>
          </div>
          <div>table data bind from apis</div>
          <div>
            <div>pagination </div>
            <div>select no fo rows</div>
          </div>
        </div>
        {/* for action new  */}
        <Outlet />
      </div>
    </>
  );
}
