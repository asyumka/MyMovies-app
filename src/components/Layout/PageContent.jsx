function PageContent({ title, children }) {
  return (
    <div className="wrapper">
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
