const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(
    // {log: ['query']}     //enable to see actual queries
)
 /**to run: open in integrated terminal-> node 4_queries.js getAllStaff( if function is getAllStaff) */
 
function getAllStaff() {
    return prisma.staff.findMany({      
    })
}
 
/** Section A: Basic Queries */
 
 
function getHodInfo() {
    return prisma.department.findMany({
        select: {
            deptName: true,
            hodApptDate: true
        }
    });
}
 
 
function getDeptStaffingInfo() {
    return prisma.department.findMany({
        select: {
            deptCode: true,
            noOfStaff: true
        },
        orderBy: [
            {
                noOfStaff: 'desc'
            },
            {
                deptCode: 'desc'
            }
        ]
    });
}
 
 
function getCitizenshipWithoutDuplicates() {
    return prisma.staff.findMany({
        select: {
            citizenship: true
        },
        distinct: ['citizenship'],
        orderBy: {
            citizenship: 'desc'
        }
    });
}
 
 
/** Section B: Filtering Queries */
 
 
function getStaffofSpecificCitizenships() {
    return prisma.staff.findMany({
        select: {
            citizenship: true,
            staffName: true
        },
        where: {
            citizenship: {
                in: ['Korea', 'Malaysia', 'Thailand', 'Hong Kong']
            }
        },
        orderBy: [
            {
                citizenship: 'asc'
            },
            {
                staffName: 'asc'
            }
        ]
    });
}
 
 
function getStaffWithBachelorDegreeOrDeputyDesignation() {
    return prisma.staff.findMany({
        select: {
            highestQln: true,
            staffName: true,
            designation: true
        },
        where: {
            OR: [
                {
                    highestQln: {
                        startsWith: 'B',
                    }
                },
                {
                    designation: {
                        contains: 'deputy',                    
                    }
                }
            ]
        },
        orderBy: [
            {
                highestQln: 'asc'
            },
            {
                staffName: 'asc'
            }
        ]
    });
}
 
 
function getStaffByCriteria1() {
    return prisma.staff.findMany({
        select: {
            gender: true,
            pay: true,
            maritalStatus: true,
            staffName: true
        },
        where: {
            maritalStatus: {
                equals: 'M'
            },
            OR: [
                {
                    gender: 'F',
                    pay: { gte: 4000, lte: 7000 }
                },
                {
                    gender: 'M',
                    pay: { gte: 2000, lte: 6000 }
                }
            ]
        },
        orderBy: [
            {
                gender: 'asc'
            },
            {
                pay: 'asc'
            }
        ]
    });
}
 
 
/** Section C: Relation Queries */
 
async function getDepartmentCourses() {
    return prisma.department.findMany({
        select: {
            deptName: true,
            course: {
                select: {
                    crseName: true,
                    crseFee: true,
                    labFee: true
                }
            }
        },
        orderBy: {
            deptName: 'asc'
        }
    })
}
 
 
const getStaffAndDependents = () => {
    return prisma.staff.findMany({
        select: {
            staffName: true,
            staffDependent: {
                select: {
                    dependentName: true,
                    relationship: true
                }
            },
        },
        where: {
            staffDependent: {
                some: {}
            }
        },
        orderBy: {
            staffName: 'asc'
        }
    });
};
 
const getDepartmentCourseStudentDob = () => {
    return prisma.department.findMany({
        select: {
            deptName: true,
            course: {
                select: {
                    crseName: true,
                    student: {
                        select: {
                            studName: true,
                            dob: true,
 
                        },
                        orderBy: {
                            dob: 'desc'
                        }
                    }
                },
                where: {
                    student: {
                        some: {}
                    }
                },
                orderBy: {
                    crseName: 'asc',
                },
            }
        },
        where: {
            course: {
                some: {}
            }
        },
        orderBy: {
            deptName: 'asc',
        },      
    });
};
 
async function main(argument) {
    let results;
    switch (argument) {
        case 'getAllStaff':
            results = await getAllStaff();
            break;
        case 'getCitizenshipWithoutDuplicates':
            results = await getCitizenshipWithoutDuplicates();
            break;
        case 'getHodInfo':
            results = await getHodInfo();
            break;
        case 'getDeptStaffingInfo':
            results = await getDeptStaffingInfo();
            break;
        case 'getStaffofSpecificCitizenships':
            results = await getStaffofSpecificCitizenships();
            break;
        case 'getStaffWithBachelorDegreeOrDeputyDesignation':
            results = await getStaffWithBachelorDegreeOrDeputyDesignation();
            break;
        case 'getStaffByCriteria1':
            results = await getStaffByCriteria1();
            break;
        case 'getDepartmentCourses':
            results = await getDepartmentCourses();
            break;
        case 'getStaffAndDependents':
            results = await getStaffAndDependents();
            break;
        case 'getDepartmentCourseStudentDob':
            results = await getDepartmentCourseStudentDob();
            break;
        default:
            console.log('Invalid argument');
            break;
    }
    results && console.log(results);
}
 
main(process.argv[2]);