// import WPAPI from "wpapi";
import fetch from "isomorphic-unfetch";
import Layout from "../components/Layout";
import GridItem from "../components/grid/grid-item";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";
import Error from "next/error";
// const wp = new WPAPI({ endpoint: `${process.env.CMS_URL}/wp-json` });

class Index extends React.Component {
  static async getInitialProps(context) {
    const { lang } = context.query;
    const [home, pages] = await Promise.all([
      await fetch(
        `${process.env.CMS_URL}/${lang}/wp-json/wp/v2/pages/?slug=home`
      ).then(res => res.json()),
      await fetch(
        `${process.env.CMS_URL}/${lang}/wp-json/wp/v2/rooms`
      ).then(res => res.json())
      // wp.pages().perPage(4)
    ]);

    return { home, pages };
  }

  render() {
    const { home, pages, headerMenu } = this.props;

    if (home.length < 1) return <Error statusCode={404} />;
    return (
      <Layout title={home[0].yoast_title} meta={home[0].yoast_meta}>
        <Header menu={headerMenu} />
        <div className="flex flex-wrap">
          {pages.map(page => (
            <GridItem page={page} key={page.id} />
          ))}
        </div>
      </Layout>
    );
  }
}
export default PageWrapper(Index);
