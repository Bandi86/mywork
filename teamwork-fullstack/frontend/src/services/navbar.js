export function dropDown(
  Dropdown,
  Button,
  Icon,
  itemCount,
  Link,
  text,
  Component,
  state,
  setter,
  user
) {
  return (
    <div className="flex flex-row items-center gap-4 text-3xl">
      <Dropdown
        inline
        label={
          <>
            <div className="flex flex-row relative">
              <Icon className="text-4xl" />
              <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs bg-red-500 rounded-full text-white">
                {itemCount}
              </span>
            </div>
            <span className="text-sm p-2">Cart</span>
          </>
        }
      >
        {itemCount === 0 ? (
          <Dropdown.Item
            disabled
            className="flex flex-col items-center gap-6 p-4"
          >
            Your Cart is empty
            <Link to={`/${text}`}>
              <Button className="">Your Cart</Button>
            </Link>
          </Dropdown.Item>
        ) : (
          <>
            <Dropdown.Item>
              <Component state={state} setter={setter} user={user} />
            </Dropdown.Item>
          </>
        )}
      </Dropdown>
    </div>
  );
}

export function dropDownInsert(
  data,
  user,
  Button,
  Link,
  linkTo,
  Icon,
  nanoid,
  handleRemoveProduct,
  setIsHovered,
  isHovered
) {
  return (
    <div className="flex flex-col w-[15rem] items-center gap-4">
      <span className="border-b-2 mt-2">Last 5 Item</span>
      {data.map((item, index) => (
        <div
          className="flex flex-row w-full h-10 justify-center items-center p-2 gap-2 border-2 border-slate-200 relative"
          onMouseEnter={() => setIsHovered(index)}
          onMouseLeave={() => setIsHovered(-1)}
          key={nanoid()}
        >
          <div>{/* image */}</div>
          <div>Product Name: {item.name}</div>
          <div>Price: {item.price}</div>
          <div>Quantity: {item.quantity}</div>
          {isHovered === index && (
            <span
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => handleRemoveProduct(index)}
            >
              X
            </span>
          )}
        </div>
      ))}
      <div>
        total amount: {data.length} item{" "}
        {data.reduce((total, item) => total + item.price * item.quantity, 0)}
      </div>
      <div>
        <Link to={`/${linkTo}/${user.localId}`}>
          <Button>
            <Icon className="mr-2 h-5 w-5" />
            <p>Go to Cart</p>
          </Button>
        </Link>
      </div>
    </div>
  );
}
