export default function PageContainer({ children }) {
    return (
      <div className="page-content">
        <div className="width-sizing">
            {children}
        </div>
      </div>
    )
  }
  