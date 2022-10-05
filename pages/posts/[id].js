import { useRouter } from "next/router";
import Link from 'next/link'
import Map from '../map'
import styles from './../../styles/Home.module.scss'
import button from './../../styles/Button.module.scss'

export default function PostPage() {
  const router = useRouter();
  return <div className={styles.main}>
    <div>
    Name: {router.query.name}
    </div>
    <div>
    Street: {router.query.street}
    </div>
    <div>
    City: {router.query.city}
    </div>
    <div>
    State: {router.query.state}
    </div>
    <div>
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
    <Map lng={router.query.lng} lat={router.query.lat}/>
    </div>;
}
