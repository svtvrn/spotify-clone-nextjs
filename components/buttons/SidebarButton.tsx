export default function SidebarButton({
  text,
  activeTab,
  onClick,
  children,
}: {
  onClick?: React.ReactEventHandler<HTMLButtonElement>;
  text?: String;
  activeTab: Boolean;
  children?: any;
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        activeTab ? 'text-violet-500' : 'text-slate-500'
      } my-1 focus:outline-none cursor-default hover:cursor-pointer flex flex-row py-2 hover:px-4 hover:w-fit w-full rounded-3xl  hover:text-white hover:bg-violet-400 hover:duration-100`}
    >
      {children}
      <span className="font-medium text-sm ml-3">{text}</span>
    </button>
  );
}
