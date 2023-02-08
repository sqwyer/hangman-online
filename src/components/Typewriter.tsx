import styles from "../styles/Typewriter.module.css";

export interface TypewriterProps {
    maxlength?: bigint
}

export default function Typewriter(props: TypewriterProps) {
    return (
        <div className="text-white flex flex-row justify-center flex-wrap max-w-xl gap-2" onKeyDown={(e) => {
            console.log(e.detail)
        }}>
            <div className="flex flex-col">
                <p className={`${styles.letter} pulse bg-white animate-pulse`}></p>
            </div>
        </div>
    )
}