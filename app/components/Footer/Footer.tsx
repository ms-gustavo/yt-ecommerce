import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-brown text-beige text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Categorias</h3>
            <Link href="#">Celulares</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Relógios</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Accessórios</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">SAC</h3>
            <Link href="#">Entre em contato</Link>
            <Link href="#">Política de compras</Link>
            <Link href="#">Devoluções e Trocas</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">Sobre nós</h3>
            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint non
              doloremque soluta inventore eveniet expedita distinctio. Nobis
              sequi tempore voluptatibus id.
            </p>
            <p>
              &copy; {new Date().getFullYear()} E~Comm. Todos os direitos
              reservados
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Siga nas redes sociais</h3>
            <div className="flex gap-2">
              <Link
                href="https://www.instagram.com/brilhemais.oficial"
                target="_blank"
              >
                {" "}
                <AiFillInstagram size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
