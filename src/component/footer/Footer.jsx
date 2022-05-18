import "./styles.css"
import { footerData } from "./footerData"

const Footer = () => {
    const fb = "https://www.facebook.com/maria.evelyn.378";
    const wa = "https://wa.me/6285399998992";
    return (
        <div className="Footer">
            <h4 className="Logo">Mary Winter</h4>
            {
                footerData.map((data, dataIdx) => {
                    return (
                        <div key={dataIdx} className="Footer_Wrapper">
                            <h4>{data.title}</h4>
                            {
                                data.items.map(({ Icon, item }, idx) => {
                                    return (
                                        <a key={idx} href={item === "Facebook" ? fb : wa}>
                                            {Icon && <Icon />}
                                            {item}
                                        </a>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Footer;