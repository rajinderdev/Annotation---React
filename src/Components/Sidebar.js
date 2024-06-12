import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ disabled }) => {
  const [user, setUser] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user_details")));
  }, []);

  const toggleSubMenu = (submenu) => {
    setActiveSubMenu((prevSubMenu) =>
      prevSubMenu === submenu ? null : submenu
    );
  };
  console.log(disabled);
  return (
    <>
      {!disabled && (
        <div className="sidenav">
          <Link
            to="/folders"
            className={
              location.pathname === "/folders"
                ? "nav-item nav-link px-3 active"
                : "nav-item nav-link px-3"
            }
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-folder"
                viewBox="0 0 16 16"
              >
                <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z" />
              </svg>
              Folders
            </div>
          </Link>

          {user?.role_id === 1 && (
            <div className="nav-drop-down-dv">
              <div
                className="nav-item nav-link px-3"
                style={{
                  cursor: "poFolderinter",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => toggleSubMenu("settings")}
              >
                <Link to="#" style={{ flex: 1 }}>
                  <div
                    className={
                      location.pathname === "/user" ||
                      location.pathname === "/attribute"
                        ? "nav-item nav-link px-3 active"
                        : "nav-item nav-link px-3"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-gear"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                    </svg>
                    
                    Settings
                  </div>

                  {/* <img
              src="/images/icons/Vector.svg"
              alt="icon"
              className={activeSubMenu === "settings" ? "rotate-icon" : ""}
            /> */}
                </Link>
              </div>

              {activeSubMenu === "settings" && (
                <div className="pl-3">
                  <Link
                    to="/user"
                    className={
                      location.pathname === "/user"
                        ? "nav-item nav-link px-3 active"
                        : "nav-item nav-link px-3"
                    }
                  >
                    <div>
                      <img
                        src="/images/icons/Vector.svg"
                        alt="icon"
                        className={
                          location.pathname === "/user" ? "rotate-icon" : ""
                        }
                      />
                      Manage Users
                    </div>
                  </Link>

                  <Link
                    to="/attribute"
                    className={
                      location.pathname === "/attribute"
                        ? "nav-item nav-link px-3 active"
                        : "nav-item nav-link px-3"
                    }
                  >
                    <div>
                      <img
                        src="/images/icons/Vector.svg"
                        alt="icon"
                        className={
                          location.pathname === "/attribute"
                            ? "rotate-icon"
                            : ""
                        }
                      />
                      Manage Attribute
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
