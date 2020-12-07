# Como alinear una imagen en un div

Como alinear el titulo de instagram

```css 
  display: block;
  margin-left: auto;
  margin-right: auto;
```


# Usar <Link> para para moverse entre paginas rapido en vez de <a>

```javascript
import { Link } from 'react-router-dom'

<Link to="/signup">Signup</Link>

```

# Usar react router

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// apps.js
<Router>
      <LogoutRoutes login={login} signup={signup} />
      <div>{JSON.stringify(usuario)}</div>

    </Router>);

// funcion LogoutRoutes
<Switch>
      <Route
        path="/login/"
        render={(props) => <Login{...props} login={login} />}
      />
      <Route
        // this route doesn´t have path because is the defaout route
        render={(props) => <Signup{...props} signup={signup} />}
        default
      />
    </Switch>
```