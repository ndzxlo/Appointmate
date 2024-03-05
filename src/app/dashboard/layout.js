"use client";
import Link from "next/link";
import "./dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faCaretDown,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { firebase } = useAuthContext();

  function checkURL() {
    if (pathname == "/dashboard/appointment-type") {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <header>
        <div className="navbar">
          <h1>AppointMate</h1>
          <nav>
            <ul>
              <div className="dropdown">
                <li>
                  <FontAwesomeIcon icon={faCircleUser} className="link-icon" />
                  <FontAwesomeIcon icon={faCaretDown} className="link-icon" />
                </li>
                <div className="dropdown-content">
                  <FontAwesomeIcon icon={faUser} className="drop-down-icon" />
                  <Link href="#">profile</Link>
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="drop-down-icon"
                  />
                  <Link href="#">logout</Link>
                </div>
              </div>
            </ul>
          </nav>
        </div>
        <hr></hr>
      </header>
      <div className="app-bar">
        <h3>
          <Link
            href="/dashboard/appointment-type"
            className="appTypeToggle"
            style={{ color: checkURL() ? "black" : "#7c7373" }}
          >
            Appointment type
          </Link>
        </h3>
        <h3>
          <Link
            href="/dashboard/scheduled-appointment"
            className="appScheduleToggle"
            style={{ color: checkURL() ? "#7c7373" : "black" }}
          >
            Scheduled appointment
          </Link>
        </h3>
        <hr></hr>
      </div>
      {children}
    </div>
  );
}
