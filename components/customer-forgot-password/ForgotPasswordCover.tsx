import Image from "next/image";

const ForgotPasswordCover = () => {
  const imageStyles = {
    position: "absolute",
    inset: 0,
    height: "100%",
    width: "100%",
    objectFit: "cover",
  };

  return (
    <div className="relative hidden w-0 flex-1 lg:block">
      <div className="h-full bg-black w-full inset-0 absolute z-10 opacity-50"></div>
      <Image
        src="/assets/customer-login-cover.jpg"
        fill={true}
        style={imageStyles}
        alt="Login Cover Photo"
      />
    </div>
  );
};

export default ForgotPasswordCover;
