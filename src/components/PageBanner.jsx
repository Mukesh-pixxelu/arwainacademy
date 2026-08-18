import { Link } from 'react-router-dom'
import { asset } from '../utils/asset.js'
import './PageBanner.css'

export default function PageBanner({ title, text, image, crumbs }) {
  return (
    <section className="page-banner">
      <div
        className="page-banner-bg"
        style={{ backgroundImage: `url("${asset(image)}")` }}
        aria-hidden="true"
      />
      <div className="wrap page-banner-inner">
        <h1>{title}</h1>
        {text ? <p>{text}</p> : null}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            {crumbs.map((crumb, index) => (
              <li key={crumb.label}>
                {crumb.to ? (
                  <Link to={crumb.to}>{crumb.label}</Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
                {index < crumbs.length - 1 ? (
                  <span className="breadcrumb-sep" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}
