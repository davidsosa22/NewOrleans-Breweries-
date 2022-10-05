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
    <div style={{marginBottom: 10 + 'px'}}>
    Address: {router.query.street} {router.query.city}, {router.query.state} {router.query.zip}
    </div>
    <div style={{marginBottom: 10 + 'px'}}>
    Zip: {router.query.zip}
    </div>
    <a href={router.query.url}>
    Url:  {router.query.url}
    </a>
    <div>
    <Link href="/">
        <button className={button.button}>Back</button>
      </Link>
    </div>
    <div className={map.grid}>
    <Map lng={router.query.lng} lat={router.query.lat}/>
    </div>
    </div>;
}
