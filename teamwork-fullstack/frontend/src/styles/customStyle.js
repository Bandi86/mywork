export const customTheme = {
  base: "flex flex-col gap-2",
  tablist: {
    base: "flex text-center",
    styles: {
      default: "flex-wrap border-b border-gray-200",
      underline:
        "flex-wrap -mb-px border-b border-gray-200"     
    },
    tabitem: {
      base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:ring-4 focus:ring-blue-600 focus:outline-none",
      styles: {
        default: {
          base: "rounded-t-lg",
          active: {
            on: "bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-cyan-500",
            off: "text-black hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800",
          },
        },
        underline: {
          base: "rounded-t-lg",
          active: {
            on: "text-black rounded-t-lg border-b-2 border-blue-600 active dark:text-cyan-500 dark:border-blue-600",
            off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400",
          },
        },       
      },
      icon: "mr-2 h-5 w-5",
    },
  },
  tabpanel: "py-3",
}; 



