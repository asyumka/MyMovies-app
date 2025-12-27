import classes from "./Button.module.css";

function Button({ children, isTransperent, ...props }) {
  return (
    <button
      className={
        isTransperent ? classes.btn + " " + classes.transperent : classes.btn
      }
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
