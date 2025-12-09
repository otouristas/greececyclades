import { useParams } from 'react-router-dom';
import { cyclades } from '../data/islandsData';

export default function IslandDetail() {
    const { slug } = useParams<{ slug: string }>();
    const island = cyclades.find(i => i.slug === slug);

    if (!island) {
        return <div className="min-h-screen pt-24 px-4"><h1 className="text-4xl font-bold">Island Not Found: {slug}</h1></div>;
    }

    return (
        <div className="min-h-screen pt-24 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">{island.name}</h1>
                <p className="text-xl text-gray-600 mb-8">{island.quote || island.shortDescription}</p>
                <div className="prose max-w-none">
                    <p>{island.description}</p>
                </div>
            </div>
        </div>
    );
}
