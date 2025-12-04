import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface RouteData {
    name: string;
    startPoint: string;
    endPoint: string;
    region: string;
    stations: string[];
    averageTimeInMinutes: number;
    ticketPrice: number;
    routeStatusId: number;
}

const routesData = [
    {
        name: "M5",
        startPoint: "التجمع الخامس",
        endPoint: "التحرير",
        region: "القطامية",
        stations: [" شارع التسعين", "محور المشير", "العباسية", "رمسيس"],
        averageTimeInMinutes: 90,
        ticketPrice: 40,
        routeStatusId: 1,
    },
    {
        name: "M8",
        startPoint: "التجمع الخامس",
        endPoint: "جامعة القاهرة",
        region: "القطامية",
        stations: ["شارع التسعين", "الدائري", "مصر القديمة"],
        averageTimeInMinutes: 90,
        ticketPrice: 40,
        routeStatusId: 1,
    },
    {
        name: "M9",
        startPoint: "التجمع الخامس",
        endPoint: "ميدان الاتحاد بالمعادي",
        region: "القطامية",
        stations: ["شارع التسعين", "الدائري", "صقر قريش"],
        averageTimeInMinutes: 90,
        ticketPrice: 40,
        routeStatusId: 1,
    },
    {
        name: "M10",
        startPoint: "وادي دجلة",
        endPoint: "التحرير",
        region: "أكتوبر",
        stations: ["الهرم", "محور 26 يوليو", "الزمالك"],
        averageTimeInMinutes: 90,
        ticketPrice: 40,
        routeStatusId: 1,
    },
    {
        name: "M21",
        startPoint: "ليلة القدر",
        endPoint: "التحرير",
        region: "أكتوبر",
        stations: ["فودافون", "حدائق الأهرام", "الهرم", "جامعة القاهرة"],
        averageTimeInMinutes: 100,
        ticketPrice: 40,
        routeStatusId: 1,
    },
    {
        name: "M20",
        startPoint: "زايد",
        endPoint: "جامعة القاهرة",
        region: "زايد",
        stations: ["حدائق الأهرام", "شارع فيصل"],
        averageTimeInMinutes: 50,
        ticketPrice: 35,
        routeStatusId: 1,
    },
    {
        name: "M22",
        startPoint: "حدائق أكتوبر",
        endPoint: "التجمع الأول",
        region: "زايد",
        stations: ["حدائق الأهرام", "فيصل"],
        averageTimeInMinutes: 90,
        ticketPrice: 30,
        routeStatusId: 1,
    },
    {
        name: "NC1",
        startPoint: "القطامية",
        endPoint: "التجمع الثالث",
        region: "القاهرة الجديدة",
        stations: ["زايداليا", "الرحاب", "الجامعة الأمريكية"],
        averageTimeInMinutes: 50,
        ticketPrice: 22,
        routeStatusId: 1,
    },
    {
        name: "NC2",
        startPoint: "القطامية",
        endPoint: "اللوتس",
        region: "القاهرة الجديدة",
        stations: ["زايداليا", "الرحاب", "الجامعة الأمريكية"],
        averageTimeInMinutes: 50,
        ticketPrice: 22,
        routeStatusId: 1,
    },
    {
        name: "NS5",
        startPoint: "محطة المشير",
        endPoint: "طيبة مول",
        region: "الشروق",
        stations: ["مدينتي", "رمسيس"],
        averageTimeInMinutes: 75,
        ticketPrice: 35,
        routeStatusId: 1,
    },
    {
        name: "NS7",
        startPoint: "محطة المشير",
        endPoint: "سرايا القبة",
        region: "الشروق",
        stations: ["طريق السويس", "ميدان الساعة", "رمسيس"],
        averageTimeInMinutes: 75,
        ticketPrice: 35,
        routeStatusId: 1,
    },
    {
        name: "NS9",
        startPoint: "محطة المشير",
        endPoint: "محطة الغاز",
        region: "الشروق",
        stations: ["طريق السويس", "الرحاب"],
        averageTimeInMinutes: 75,
        ticketPrice: 35,
        routeStatusId: 1,
    },
    {
        name: "NA13",
        startPoint: "الأردنية",
        endPoint: "الحي الثالث",
        region: "العاشر من رمضان",
        stations: [],
        averageTimeInMinutes: 90,
        ticketPrice: 13,
        routeStatusId: 1,
    },
    {
        name: "NA15",
        startPoint: "الأردنية",
        endPoint: "الحي الثاني عشر",
        region: "العاشر من رمضان",
        stations: [],
        averageTimeInMinutes: 90,
        ticketPrice: 13,
        routeStatusId: 1,
    },
    {
        name: "NA18",
        startPoint: "الأردنية",
        endPoint: "سلطان عويس",
        region: "العاشر من رمضان",
        stations: [],
        averageTimeInMinutes: 90,
        ticketPrice: 13,
        routeStatusId: 1,
    },
    {
        name: "NA19",
        startPoint: "الأردنية",
        endPoint: "الجامعة الأهلية",
        region: "العاشر من رمضان",
        stations: [],
        averageTimeInMinutes: 90,
        ticketPrice: 13,
        routeStatusId: 1,
    },
    {
        name: "AN3",
        startPoint: "العبور 2",
        endPoint: "سنترال الياسمين",
        region: "العبور",
        stations: ["مدرسة الحرية", "ماركت التيسير"],
        averageTimeInMinutes: 25,
        ticketPrice: 9,
        routeStatusId: 1,
    },
    {
        name: "AN4",
        startPoint: "كافور",
        endPoint: "زهراء مدينة نصر",
        region: "العبور",
        stations: ["إيمون", "محور السادات"],
        averageTimeInMinutes: 30,
        ticketPrice: 12,
        routeStatusId: 1,
    },
    {
        name: "Z4",
        startPoint: "زايد",
        endPoint: "المهندسين",
        region: "مجتمعات غرب",
        stations: ["ميدان جهينة", "محور مصر"],
        averageTimeInMinutes: 60,
        ticketPrice: 15,
        routeStatusId: 1,
    },
    {
        name: "Z6",
        startPoint: "هايدرو وان",
        endPoint: "سادس",
        region: "مجتمعات غرب",
        stations: ["ميدان جهينة", "المحورى"],
        averageTimeInMinutes: 50,
        ticketPrice: 20,
        routeStatusId: 1,
    },
];

function RoutesTable() {
    const [routes, setRoutes] = useState<RouteData[]>(routesData);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const fetchRoutes = async () => {
    //         try {
    //             const res = await fetch("");
    //             const data = await res.json();
    //             setRoutes(data);
    //         } catch (err) {
    //             console.error("Error fetching routes:", err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchRoutes();
    // }, []);

    if (loading) {
        return <p className="text-center text-white py-10">...جاري التحميل</p>;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl font-semibold text-green-700 text-center py-4">
                خطوط السير المتاحة
            </h2>

            {/* Scroll في الموبايل فقط */}
            <div
                className="w-full overflow-x-auto lg:overflow-x-hidden"
                dir="rtl"
            >
                <Table className="w-full lg:table-fixed min-w-[950px]">
                    <TableHeader>
                        <TableRow className="border-b-2 border-green-300">
                            <TableHead className="text-center w-[15%]">
                                القطاع
                            </TableHead>
                            <TableHead className="text-center w-[8%]">
                                الخط
                            </TableHead>
                            <TableHead className="text-center w-[14%]">
                                من
                            </TableHead>
                            <TableHead className="text-center w-[14%]">
                                إلى
                            </TableHead>

                            {/* المحطات كبيرة شوية */}
                            <TableHead className="text-center w-[26%]">
                                المحطات
                            </TableHead>

                            <TableHead className="text-center w-[9%]">
                                المدة
                            </TableHead>
                            <TableHead className="text-center w-[8%]">
                                السعر
                            </TableHead>
                            <TableHead className="text-center w-[8%]">
                                الحالة
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {routes.map((r, index) => (
                            <TableRow
                                key={index}
                                className="border-b-2 border-green-300 hover:bg-green-50 transition"
                            >
                                <TableCell className="text-center border-l-2 border-green-200 break-words">
                                    {r.region}
                                </TableCell>

                                <TableCell className="text-center text-orange-600 border-l-2 border-green-200">
                                    {r.name}
                                </TableCell>

                                <TableCell className="text-center border-l-2 border-green-200 break-words">
                                    {r.startPoint}
                                </TableCell>

                                <TableCell className="text-center border-l-2 border-green-200 break-words">
                                    {r.endPoint}
                                </TableCell>

                                <TableCell className="text-center border-l-2 border-green-200 whitespace-normal break-words max-w-[260px]">
                                    {r.stations.length
                                        ? r.stations.join(" - ")
                                        : "لا توجد محطات"}
                                </TableCell>

                                <TableCell className="text-center border-l-2 border-green-200">
                                    {r.averageTimeInMinutes} دقيقة
                                </TableCell>

                                <TableCell className="text-center border-l-2 border-green-200 font-semibold text-green-700">
                                    {r.ticketPrice} EGP
                                </TableCell>

                                <TableCell className="text-center font-semibold">
                                    {r.routeStatusId === 1 ? (
                                        <span className="text-green-600">
                                            نشط
                                        </span>
                                    ) : (
                                        <span className="text-red-600">
                                            متوقف
                                        </span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default RoutesTable;
