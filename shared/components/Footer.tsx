import Logo from "@/ui/Logo";
import Image from "next/image";
import FacebookIcon from "@/public/Facebook.svg";
import TwitterIcon from "@/public/Twitter.svg";
import InstagramIcon from "@/public/Instagram.svg";
import LinkedInIcon from "@/public/LinkedIn.svg";
import YouTubeIcon from "@/public/YouTube.svg";
import Envelope from "@/public/Envelope.svg";
import Phone from "@/public/Phone.svg";
import Location from "@/public/Location.svg";

export default function Footer() {
  return (
    <footer className="border border-border-gray">
      <div className="container flex justify-between py-20">
        <section className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="max-w-11.25">
                <Logo />
              </div>
              <h1 className="text-2xl font-medium text-dark-puple">Bootcamp</h1>
            </div>
            <p className="text-dark-puple text-sm max-w-77.5 font-medium">
              Your learning journey starts here! Browse courses to get started.
            </p>
          </div>

          <div className="flex items-center gap-5.5">
            <Image src={FacebookIcon} alt="facebook" />
            <Image src={TwitterIcon} alt="twitter" />
            <Image src={InstagramIcon} alt="instagram" />
            <Image src={LinkedInIcon} alt="linkedin" />
            <Image src={YouTubeIcon} alt="youtube" />
          </div>
        </section>
        <div className="flex w-full max-w-175 justify-between">
          <section>
            <h1 className="text-dark-puple text-xl font-semibold mb-4">
              Explore
            </h1>
            <ul className="text-medium-gray">
              <li>Enrolled Courses</li>
              <li>Browse Courses</li>
            </ul>
          </section>
          <section>
            <h1 className="text-dark-puple text-xl font-semibold mb-4">
              Account
            </h1>
            <ul className="text-medium-gray">
              <li>My Profile</li>
            </ul>
          </section>
          <section>
            <h1 className="text-dark-puple text-xl font-semibold mb-4">
              Contact
            </h1>
            <ul className="text-medium-gray space-y-2.5">
              <li className="flex items-center gap-1.5">
                <Image src={Envelope} alt="envelope" />{" "}
                <span>contact@company.com</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Image src={Phone} alt="phone" />{" "}
                <span>(+995) 555 111 222</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Image src={Location} alt="location" />{" "}
                <span>Aghmashenebeli St.115</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className="flex justify-between items-center container pb-5">
        <p className="text-lg text-medium-gray">
          Copyright © 2026 Redberry International
        </p>
        <p className="text-lg text-medium-gray">
          All Rights Reserved |{" "}
          <span className="text-primary-purple">Terms and Conditions</span> |{" "}
          <span className="text-primary-purple">Privacy Policy</span>
        </p>
      </div>
    </footer>
  );
}
