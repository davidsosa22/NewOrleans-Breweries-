import { useRouter } from "next/router";
import Link from 'next/link'
import Map from '../map'
import styles from './../../styles/Home.module.scss'
import button from './../../styles/Button.module.scss'
import map from './../../styles/Map.module.scss'

export default function PostPage() {
  const router = useRouter();
  return <div className={styles.main} >
    <div style={{marginBottom: 10 + 'px'}}>
    Name: {router.query.name}
    </div>
    <p>Address:</p>
        <hr />
        <span>{router.query.street} {router.query.city}, </span>
        <span>{router.query.state} {router.query.zip}</span>
    <td onClick={()=> window.open(router.query.url, "_blank")} className={button.button}>
      Visit Page
      </td>

    <div className={map.grid}>
    <Map lng={router.query.lng} lat={router.query.lat}/>
    </div>
    </div>;
}
