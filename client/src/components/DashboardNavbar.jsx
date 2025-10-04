import { useState, useEffect, useCallback, memo } from 'react';
import { LogOut, Menu, ToolCase, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../config/config';
import { toast } from 'react-toastify';

const DashboardNavbar = ({ activeTab: propActiveTab, setActiveTab: propSetActiveTab }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const path = location.pathname.replace("/", ""); // e.g., "allshipments"

    const token = localStorage.getItem('token');

    const tabMap = {
        dashboard: "Dashboard",
        myshipments: "MyShipments",
        allshipments: "AllShipments"
    };

    // Initialize username from cache or fetch if needed
    useEffect(() => {
        const initializeUsername = async () => {
            // Check if username is cached
            const cachedUsername = localStorage.getItem('username');
            const cachedToken = localStorage.getItem('token');
            
            if (cachedUsername && cachedToken === token) {
                // Use cached username if token matches
                setUsername(cachedUsername);
                return;
            }
            
            // Only fetch if we have a token and no cached username
            if (token && !cachedUsername) {
                setIsLoading(true);
                try {
                    const response = await fetch(`${BACKEND_URL}/auth/fetch/`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': token,
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();
                    setUsername(data.username);
                    // Cache the username
                    localStorage.setItem('username', data.username);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setUsername('User');
                } finally {
                    setIsLoading(false);
                }
            } else if (!token) {
                setUsername('User');
            }
        };

        initializeUsername();
    }, [token]);

    // Use prop values when available, fallback to local state
    const activeTab = propActiveTab || tabMap[path] || "Dashboard";

    const navItems = [
        { name: "Dashboard", label: "Dashboard" },
        { name: "MyShipments", label: "My Shipments" },
        { name: "AllShipments", label: "All Shipments" }
    ];

    const handleClick = useCallback((item) => {
        if (propSetActiveTab) {
            propSetActiveTab(item);
        }
        const name = item.toLowerCase();
        navigate(`/${name}`);
        setIsMenuOpen(false); // close mobile menu if open
    }, [propSetActiveTab, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Clear cached username
        toast.success("Logged Out Successfully!!!");
        navigate('/');
    }

    // Function to refresh username cache (can be called from other components)
    const refreshUsername = async () => {
        if (!token) return;
        
        setIsLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/auth/fetch/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setUsername(data.username);
            localStorage.setItem('username', data.username);
        } catch (error) {
            console.error('Error refreshing username:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full px-4 sm:px-6 lg:px-8 pt-4 z-50 bg-[#F9F6F3]">
            <nav className="relative flex items-center justify-between px-6 py-3 rounded-3xl modern-glass border border-gray-200 shadow-lg">
                {/* Logo */}
                <div className="flex items-center gap-3 z-10">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <path d="M21 7L12 13L3 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent">
                        Shipsy
                    </span>
                </div>

                {/* Navigation Pills */}
                <div className="hidden lg:flex items-center gap-2 bg-white/10 p-1 rounded-2xl backdrop-blur-sm">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleClick(item.name)}
                            className={`relative cursor-pointer px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm
                                ${activeTab === item.name
                                    ? "text-gray-900 bg-blue-200/30 shadow-inner"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                                }
                            `}
                        >
                            {activeTab === item.name && (
                                <div className="absolute inset-0 rounded-xl bg-blue-200/30 backdrop-blur-sm" />
                            )}
                            <span className="relative z-10">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 z-10">
                    {/* Profile */}
                    <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                        <div className="text-right hidden md:block">
                            <p className="text-xs text-gray-500">Welcome back</p>
                            <p className="text-sm font-medium text-gray-900">
                                {isLoading ? (
                                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                                ) : (
                                    username
                                )}
                            </p>
                        </div>
                        <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg cursor-pointer">
                            <span className="text-lg">
                                {isLoading ? (
                                    <div className="w-4 h-4 bg-white/30 rounded animate-pulse"></div>
                                ) : (
                                    username.charAt(0).toUpperCase()
                                )}
                            </span>
                        </div>
                        <div
                            onClick={handleLogout}
                            className='cursor-pointer'
                        >
                            <span><LogOut /></span>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 border border-gray-200"
                    >
                        {isMenuOpen ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden mt-4 p-4 rounded-2xl modern-glass border border-gray-200 shadow-lg">
                    <div className="space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => handleClick(item.name)}
                                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all
                                    ${activeTab === item.name
                                        ? "bg-blue-200/30 text-gray-900 border border-blue-300/30"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                                    }
                                `}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
                .modern-glass {
                    background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%);
                    backdrop-filter: blur(25px) saturate(180%);
                    -webkit-backdrop-filter: blur(25px) saturate(180%);
                }
            `}</style>
        </div>
    );
};

const MemoizedDashboardNavbar = memo(DashboardNavbar);
MemoizedDashboardNavbar.displayName = 'DashboardNavbar';
export default MemoizedDashboardNavbar;
