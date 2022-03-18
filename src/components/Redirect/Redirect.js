import { h } from "preact";
import { useEffect } from "preact/hooks";
import { route } from "preact-router";

const Redirect = (props) => {
  useEffect(() => {
    return route(props.location, true);
  }, []);

  return;
}

export default Redirect;