import "../assets/style/alert.css";
const AlertBox = ({ text, type }) => {
  return (
    <div
      className="alertbox"
      style={{
        borderColor:
          type == "error" ? "red" : type == "success" ? "green" : "gray",
      }}
    >
      <p
        style={{
          color: type == "error" ? "red" : type == "success" ? "green" : "",
        }}
      >
        {text}
      </p>
    </div>
  );
};
export default AlertBox;
