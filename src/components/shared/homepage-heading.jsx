const HomePageHeading = ({ text }) => {
  return (
    <h1 className="text-[24px] md:[32px] font-semibold text-textPrimary flex items-center justify-center mb-[30px] lg:mb-[50px]">
      <div className="h-8 w-2 bg-primary mr-2"></div>
      {text}
    </h1>
  );
};

export default HomePageHeading;
