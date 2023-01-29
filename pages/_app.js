import "@/styles/globals.css";
import { store, persistor } from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import Refresher from "../components/Refresher";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [loading,setisloading] = useState(true)
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {!loading && <Component {...pageProps} />}
          <Refresher setisloading  = {setisloading}/>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
