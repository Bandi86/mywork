const Input = ({ type, title }: { type: string; title: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">{title}</label>
      <input type={type} className="w-full border border-black rounded-full p-2" />
    </div>
  )
}

export default Input
