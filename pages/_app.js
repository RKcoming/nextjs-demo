import Layout from '../components/layout/Layout';
import '../styles/globals.css';
function MyAPP({Component,pageProps}){
   return (
     <Layout>
        <Component {...pageProps} />
    </Layout>);
}
export default MyAPP;