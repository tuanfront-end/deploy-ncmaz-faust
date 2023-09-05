import Page404Content from "@/container/404Content";

export default function Page404() {
  return (
    <>
      <Page404Content />
    </>
  );
}

export const getStaticProps = () => {
  return {
    props: {},
  };
};
