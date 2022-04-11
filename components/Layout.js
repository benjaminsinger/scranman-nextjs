import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
              <span>The</span>
              <span>Scran Man</span>
          </a>
        </Link>
      </header>

      <main id="main" className="page-content">
        { children }
      </main>

      <footer>
        <p>Copyright {new Date().getFullYear()} <strong><em>ScranMan</em></strong> :)</p>
      </footer>
    </div>
  )
}