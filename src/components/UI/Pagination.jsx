import { useSearchParams } from "react-router";
import classes from "./Pagination.module.css";
import Button from "./Button";

const Pagination = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set("page", newPage);
      return prev;
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  return (
    <div className={classes.pagination}>
      <Button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        ← Back
      </Button>

      <span className={classes.info}>
        Page {currentPage} of {totalPages}
      </span>

      <Button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next →
      </Button>
    </div>
  );
};

export default Pagination;
