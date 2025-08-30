import './App.css'
import {v4 as uuidv4} from 'uuid'
import {useState} from 'react'

const App = () => {
  const [website, setWebsite] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordList, setPasswordList] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [search, setSearch] = useState('')
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const colors = [
    '#7683cb', // blue
    '#f59e0b', // yellow
    '#10b981', // green
    '#f97316', // orange
    '#14b8a6', // teal
    '#b91c1c', // red
    '#0ea5e9', // sky blue
    '#64748b', // slate
  ]
  const imgSrc =
    screenWidth <= 767
      ? 'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
  const add = e => {
    e.preventDefault()
    if (website && username && password) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      const newPassword = {
        id: uuidv4(),
        website,
        username,
        password,
        color: randomColor,
      }
      setPasswordList([...passwordList, newPassword])
      setPassword('')
      setUsername('')
      setWebsite('')
    }
  }

  const deletePassword = id => {
    setPasswordList(passwordList.filter(item => item.id !== id))
  }

  const filteredPasswords = passwordList.filter(item =>
    item.website.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <>
      <div className="app-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="adding-new-password">
          <div className="form">
            <h1 className="adding-heading">Add New Password</h1>
            <form className="password-form" onSubmit={add}>
              <div className="input-div">
                <img
                  className="img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                />
              </div>
              <div className="input-div">
                <img
                  className="img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="input-div">
                <img
                  className="img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="button">
                <button className="add-btn" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="background-img">
            <img
              src={imgSrc}
              alt="password manager"
              className="password-manager"
            />
          </div>
        </div>
        <div className="password-list">
          <div className="password">
            <h1 className="password-heading">
              Your Passwords <span>{filteredPasswords.length}</span>
            </h1>
            <div className="search-div">
              <img
                className="search-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                className="search-input"
                placeholder=" Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <hr></hr>
          <div className="show-pass-div">
            <input
              id="showPasswords"
              type="checkbox"
              className="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPasswords">Show passwords</label>
          </div>
          <div className="password-container">
            {filteredPasswords.length == 0 ? (
              <div className="password-result">
                <img
                  className="no-pass-img"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p className="no-pass-text">No Passwords</p>
              </div>
            ) : (
              <div className="passwordList-container">
                <ul className="ul">
                  <div className="passwords">
                    {filteredPasswords.map(item => (
                      <li key={item.id} className="password-card">
                        <div className="info">
                          <div
                            className="website-letter-img"
                            style={{backgroundColor: item.color}}
                          >
                            {item.website[0].toUpperCase()}
                          </div>
                          <div className="text">
                            <p>{item.website}</p>
                            <p>{item.username}</p>
                            {showPassword ? (
                              <p>{item.password}</p>
                            ) : (
                              <img
                                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
                                className="pass-image"
                                alt="stars"
                              />
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="delete"
                          data-testid="delete"
                          onClick={() => deletePassword(item.id)}
                        >
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                            alt="delete"
                            className="delete-btn"
                          />
                        </button>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
