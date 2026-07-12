import Employee from "../../Models/employ-Model.js";

const signup = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    
    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, phone and password are required.",
      });
    }

    
    const existingEmployee = await Employee.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    
    const existingPhone = await Employee.findOne({
      phone: phone.trim(),
    });

    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message: "Phone number already exists.",
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const employee = await Employee.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Employee registered successfully.",
      data: {
        id: employee._id,
        fullName: employee.fullName,
        email: employee.email,
        phone: employee.phone,
        role: employee.role,
        status: employee.status,
        department: employee.department,
        createdAt: employee.createdAt,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { signup };


