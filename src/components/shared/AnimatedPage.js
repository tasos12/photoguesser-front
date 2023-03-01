import { motion } from 'framer-motion'

export default function AnimatedPage(props) {
    const variants = {
        initial: { opacity: 0, x: -100 },
        render: { opacity:1 },
        enterScreen: { opacity: 1, x: 0 },
    }

    return (
        <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
        >
            {props.children}
        </motion.div>
    )
}