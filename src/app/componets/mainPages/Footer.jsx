
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-2">
        {/* Copyright Information */}
        <div>
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} Monu Rajj. All rights reserved.
          </p>
      </div>
    </footer>
  );
};
export default Footer;
