export const Header = ({title,a1,a2,contact}) =>{
    return(
        <div className="Header">
            <h1>{title}</h1>
            <div className="Header__nav">
                <a href="" className="Header__nav__a">{a1}</a>
                <div>
                      <a href={contact} className="Header__nav__lastA" target="_blank">{a2}</a>
                </div>

            </div>
        </div>
    );
}