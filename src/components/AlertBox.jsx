import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function AlertBox({ type = "info", children }) {
    const baseClass =
        "flex items-center gap-3 px-5 py-4 rounded-2xl mb-6 shadow-lg border text-base font-medium";

    const styles = {
        success: "bg-green-50 border-green-400 text-green-700",
        error: "bg-red-50 border-red-400 text-red-700",
        info: "bg-blue-50 border-blue-400 text-blue-700",
    };

    const icons = {
        success: <AiOutlineCheckCircle className="text-green-500 text-2xl" />,
        error: <AiOutlineCloseCircle className="text-red-500 text-2xl" />,
        info: <AiOutlineInfoCircle className="text-blue-500 text-2xl" />,
    };

    return (
        <div className={`${baseClass} ${styles[type] || styles.info}`}>
            {icons[type] || icons.info}
            <span>{children}</span>
        </div>
    );
}
