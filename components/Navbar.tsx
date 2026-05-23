'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

export default function Navbar() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
		{
			label: 'Menu',
			href: '#menu',
		},
		{
			label: 'Reviews',
			href: '#reviews',
		},
		{
			label: 'About',
			href: '#about',
		},
	];

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	const scrollToOrder = () => {
		setOpen(false);
		document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none">
			<header
				className={cn(
					'pointer-events-auto w-full max-w-5xl border-b border-transparent md:rounded-full md:border md:transition-all md:ease-out',
					{
						'bg-[#0D0D0D]/95 supports-[backdrop-filter]:bg-[#0D0D0D]/50 border-[rgba(255,255,255,0.07)] backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow-lg md:shadow-black/50':
							scrolled && !open,
						'bg-[#0D0D0D]/95 backdrop-blur-lg': open,
						'md:top-6': !scrolled,
					},
				)}
			>
				<nav
					className={cn(
						'flex h-20 w-full items-center justify-between px-6 md:h-20 md:transition-all md:ease-out',
						{
							'md:px-8': scrolled,
							'md:px-10': !scrolled,
						},
					)}
				>
					{/* Logo */}
					<a 
						href="#" 
						onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
						style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 4, color: 'var(--iron-cream)', marginLeft: '8px' }}
					>
						IRON<span style={{ color: 'var(--iron-orange)' }}>PLATE</span>™
					</a>

					<div className="hidden items-center gap-8 md:flex">
						{links.map((link, i) => (
							<a key={i} className="text-[var(--iron-cream)] hover:text-[var(--iron-orange)] transition-colors text-sm font-bold tracking-widest uppercase" href={link.href}>
								{link.label}
							</a>
						))}
						<button
							className="btn-order"
							style={{ fontSize: 14, padding: '10px 28px', marginRight: '4px', clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
							onClick={scrollToOrder}
						>
							ORDER NOW
						</button>
					</div>
					<button onClick={() => setOpen(!open)} className="md:hidden text-[var(--iron-cream)] p-2">
						<MenuToggleIcon open={open} className="size-6" duration={300} />
					</button>
				</nav>

				<div
					className={cn(
						'bg-[#0D0D0D]/95 supports-[backdrop-filter]:bg-[#0D0D0D]/80 backdrop-blur-lg fixed top-20 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y border-[rgba(255,255,255,0.07)] md:hidden',
						open ? 'block' : 'hidden',
					)}
				>
					<div className="flex h-full w-full flex-col justify-between gap-y-2 p-8">
						<div className="grid gap-y-6">
							{links.map((link) => (
								<a
									key={link.label}
									className="text-[var(--iron-cream)] hover:text-[var(--iron-orange)] transition-colors text-xl font-bold tracking-widest uppercase"
									href={link.href}
									onClick={() => setOpen(false)}
								>
									{link.label}
								</a>
							))}
						</div>
						<div className="flex flex-col gap-4 pb-12">
							<button
								className="btn-order w-full text-center"
								style={{ fontSize: 18, padding: '18px 36px', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
								onClick={scrollToOrder}
							>
								ORDER NOW
							</button>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
