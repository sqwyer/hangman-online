import styles from "../styles/Input.module.css";
export default function Input(props: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className={`${props.className ?? ""} ${
        styles.input
      } flex flex-row items-center gap-2 rounded-md px-2 py-1`}
    />
  );
}
