export default function Breadcrumb({ title, breadcrumb, children }) {
    return (
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500">{breadcrumb} / </p>
        </div>
        <div>{children}</div>
      </div>
    );
  }