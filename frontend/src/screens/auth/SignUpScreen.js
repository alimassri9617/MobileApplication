import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button, RadioButton, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { colors, spacing, typography } from '../../constants/theme';

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    uniId: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    role: 'student',
    department: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const departments = [
    'Computer Science',
    'Engineering',
    'Business',
    'Arts',
    'Science',
    'Medicine',
    'Law',
    'Education',
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, uniId, email, password, confirmPassword, gender } = formData;

    if (!firstName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'First name is required',
      });
      return false;
    }

    if (!lastName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Last name is required',
      });
      return false;
    }

    if (!uniId.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'University ID is required',
      });
      return false;
    }

    if (!email.trim() || !email.includes('@')) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Valid email is required',
      });
      return false;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Password must be at least 6 characters',
      });
      return false;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Passwords do not match',
      });
      return false;
    }

    if (!gender) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Gender is required',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User registered successfully',
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        uniId: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        role: 'student',
        department: '',
        phone: '',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons name="person-add" size={48} color={colors.primary} />
          <Text style={styles.title}>Register New User</Text>
          <Text style={styles.subtitle}>Create a new account for the university system</Text>
        </View>

        <View style={styles.form}>
          {/* Personal Information */}
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.row}>
            <TextInput
              label="First Name"
              value={formData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
              mode="outlined"
              style={[styles.input, styles.halfInput]}
            />
            <TextInput
              label="Last Name"
              value={formData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
              mode="outlined"
              style={[styles.input, styles.halfInput]}
            />
          </View>

          <TextInput
            label="University ID"
            value={formData.uniId}
            onChangeText={(text) => handleInputChange('uniId', text)}
            mode="outlined"
            style={styles.input}
            autoCapitalize="none"
          />

          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Phone (Optional)"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
          />

          {/* Gender Selection */}
          <Text style={styles.fieldLabel}>Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={styles.genderOption}
              onPress={() => handleInputChange('gender', 'male')}
            >
              <RadioButton
                value="male"
                status={formData.gender === 'male' ? 'checked' : 'unchecked'}
                onPress={() => handleInputChange('gender', 'male')}
              />
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.genderOption}
              onPress={() => handleInputChange('gender', 'female')}
            >
              <RadioButton
                value="female"
                status={formData.gender === 'female' ? 'checked' : 'unchecked'}
                onPress={() => handleInputChange('gender', 'female')}
              />
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>

          {/* Role Selection */}
          <Text style={styles.fieldLabel}>Role</Text>
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={styles.roleOption}
              onPress={() => handleInputChange('role', 'student')}
            >
              <RadioButton
                value="student"
                status={formData.role === 'student' ? 'checked' : 'unchecked'}
                onPress={() => handleInputChange('role', 'student')}
              />
              <Text style={styles.roleText}>Student</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roleOption}
              onPress={() => handleInputChange('role', 'staff')}
            >
              <RadioButton
                value="staff"
                status={formData.role === 'staff' ? 'checked' : 'unchecked'}
                onPress={() => handleInputChange('role', 'staff')}
              />
              <Text style={styles.roleText}>Staff</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roleOption}
              onPress={() => handleInputChange('role', 'admin')}
            >
              <RadioButton
                value="admin"
                status={formData.role === 'admin' ? 'checked' : 'unchecked'}
                onPress={() => handleInputChange('role', 'admin')}
              />
              <Text style={styles.roleText}>Admin</Text>
            </TouchableOpacity>
          </View>

          {/* Department Selection */}
          <Text style={styles.fieldLabel}>Department</Text>
          <View style={styles.departmentContainer}>
            {departments.map((dept) => (
              <Chip
                key={dept}
                selected={formData.department === dept}
                onPress={() => handleInputChange('department', dept)}
                style={[
                  styles.departmentChip,
                  formData.department === dept && styles.selectedDepartmentChip
                ]}
                textStyle={[
                  styles.departmentChipText,
                  formData.department === dept && styles.selectedDepartmentChipText
                ]}
              >
                {dept}
              </Chip>
            ))}
          </View>

          {/* Password Section */}
          <Text style={styles.sectionTitle}>Security</Text>
          
          <TextInput
            label="Password"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            mode="outlined"
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
          />

          <TextInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            mode="outlined"
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
          >
            Register User
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h4,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    elevation: 2,
  },
  sectionTitle: {
    ...typography.h6,
    color: colors.text,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: spacing.md,
  },
  halfInput: {
    width: '48%',
  },
  fieldLabel: {
    ...typography.body1,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '500',
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xl,
  },
  genderText: {
    ...typography.body1,
    color: colors.text,
    marginLeft: spacing.xs,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  roleText: {
    ...typography.body1,
    color: colors.text,
    marginLeft: spacing.xs,
  },
  departmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  departmentChip: {
    margin: spacing.xs,
    backgroundColor: colors.lightGray,
  },
  selectedDepartmentChip: {
    backgroundColor: colors.primary,
  },
  departmentChipText: {
    color: colors.text,
  },
  selectedDepartmentChipText: {
    color: colors.white,
  },
  submitButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
  },
  submitButtonContent: {
    paddingVertical: spacing.sm,
  },
});

