import Link from "next/link";

export const About = props =>(
    <div>
        <h1>About!</h1>
        <Link href="/index">
            <a>Go Home</a>
        </Link>
    </div>
)

export default About;