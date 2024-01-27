
interface ErrorMsgProps {
  msg: string;
}

export function ErrorMsg({ msg }: ErrorMsgProps) {
  return (
    <p className="text-xs italic font-bold text-red-500 mt-2">
      * {msg}
    </p>
  )
}