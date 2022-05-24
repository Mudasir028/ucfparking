import { ReactNode } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "../button/Button";
import { actionCreators } from "../redux";
import { SidebarHeader } from "../shell/SidebarHeader";

type IShellProps = {
  title: string;
  children: ReactNode;
};

const Shell = (props: IShellProps) => {
  const dispatch = useDispatch();

  const {
    // getTodayData
    getLastDayData,
    getLastWeekData,
    getLastMonthData
    // getLastYearData,
    // handelAllData,
  } = bindActionCreators(actionCreators, dispatch);
  return (
    <SidebarHeader
      title={props.title}
      rightContent={
        <>
          <div className="p-4">
            <div className="group relative">
              <Button>Filters</Button>
              <nav
                // tabIndex="0"
                className="border bg-white invisible rounded w-60 absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
              >
                <ul className="py-1">
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => getLastDayData()}
                    >
                      Last 24 Hours
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => getLastWeekData()}
                    >
                      Last Week
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => getLastMonthData()}
                    >
                      Last Month
                    </button>
                  </li>
                </ul>
              </nav>
              <Link href="https://github.com/JakeValenzuela/ucfparking">
                <a>
                  <Button>GitHub</Button>
                </a>
              </Link>
            </div>
          </div>
        </>
      }
    >
      {props.children}
    </SidebarHeader>
  );
};
export { Shell };
