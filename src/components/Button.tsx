import styles from "../styles/Button.module.css";
export default function Button(
  props: React.ComponentPropsWithoutRef<"button">
) {
  return (
    <button
      {...props}
      className={`${props.className ?? ""} ${
        styles.btn
      } flex flex-row items-center gap-2 rounded-md px-2 py-1 uppercase`}
    />
  );
}
